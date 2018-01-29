# had to remove some duplicated countries (CD, LA, MO)
import csv
import sys
import countries
import utils

def get_countries_gdp_ppp_by_code():
    result = {}
    countries_codes_by_name = countries.get_countries_codes_by_name()
    for row in utils.parse_csv_file('countries_gdp_ppp.csv', '\t'):
        name = row[1].strip()
        found = countries_codes_by_name.get(name)
        if found is None:
            print('Warning: couldn\'t find \'{0}\' in countries ppp gdps'.format(name))
        else:
            result[found] = row[2].replace(',', '')
    return result


def get_countries_gdp_nominal_by_code():
    result = {}
    countries_codes_by_name = countries.get_countries_codes_by_name()
    for row in utils.parse_csv_file('countries_gdp_nominal.csv', '\t'):
        name = row[1].strip()
        found = countries_codes_by_name.get(name)
        if found is None:
            print('Warning: couldn\'t find \'{0}\' in countries nominal gdps'.format(name))
        else:
            result[found] = row[2].replace(',', '')
    return result


countries_gdp_ppp_by_code = get_countries_gdp_ppp_by_code()
countries_gdp_nominal_by_code = get_countries_gdp_nominal_by_code()
countries_names_by_code = countries.get_countries_names_by_code()
not_found = []
for (code, gdp_ppp) in countries_gdp_ppp_by_code.items():
    gdp_nominal = countries_gdp_nominal_by_code.get(code)
    if gdp_nominal is None:
        not_found.append(code)
    else:
        print('{1}       {0}'.format(countries_names_by_code[code], int(gdp_nominal) / int(gdp_ppp)))
