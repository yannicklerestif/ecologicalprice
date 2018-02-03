import utils
import re
from global_data.countries import countries


def _get_countries_gdp_ppp_by_code():
    result = {}
    countries_codes_by_name = countries.get_countries_codes_by_name()
    for row in utils.parse_csv_file('resources/countries_gdp_ppp.csv', __file__, '\t'):
        name = row[1].strip()
        if name == 'World':
            continue
        found = countries_codes_by_name.get(name)
        if found is None:
            print('Warning: Country in ppp gdp file but not in countries names: {0}'
                  .format(name))
        else:
            result[found] = row[2].replace(',', '')
    return result


def _get_countries_gdp_nominal_by_code():
    result = {}
    countries_codes_by_name = countries.get_countries_codes_by_name()
    for row in utils.parse_csv_file('resources/countries_gdp_nominal.csv', __file__, '\t'):
        # removing some notes (between brackets) from the names
        name = re.sub(r"\[.*\]", "", row[1].strip())
        found = countries_codes_by_name.get(name)
        if found is None:
            print('Warning: Country in nominal gdp file but not in countries names: {0}'
                  .format(name))
        else:
            result[found] = row[2].replace(',', '')
    return result


def _get_avg_prices_by_code():
    countries_gdp_ppp_by_code = _get_countries_gdp_ppp_by_code()
    countries_gdp_nominal_by_code = _get_countries_gdp_nominal_by_code()
    countries_names_by_code = countries.get_countries_names_by_code()
    result = {}
    for (code, gdp_ppp) in countries_gdp_ppp_by_code.items():
        gdp_nominal = countries_gdp_nominal_by_code.get(code)
        if gdp_nominal is None:
            print('Warning: Country in ppp gdp file but not in nominal gdp file: {0} ({1})'
                  .format(code, countries_names_by_code[code]))
        else:
            result[code] = int(gdp_nominal) / int(gdp_ppp)
    return result


def get_avg_prices_sql():
    result = []
    avg_prices_by_code = _get_avg_prices_by_code()
    # adding the country name as a comment for clarity
    countries_names_by_code = countries.get_countries_names_by_code()
    for (code, avg_prices) in avg_prices_by_code.items():
        result.append("insert into g_country_avg_prices (country_code, country_avg_prices) "
                      "values ('{0}', '{1}'); -- {2}"
                      .format(code, avg_prices, countries_names_by_code[code]))
    return result


def get_world_ppp_gdp() -> float:
    for row in utils.parse_csv_file('resources/countries_gdp_ppp.csv', __file__, '\t'):
        name = row[1].strip()
        if name == 'World':
            return int(row[2].replace(',', '')) * 1E6


if __name__ == '__main__':
    utils.print_list(get_avg_prices_sql())
