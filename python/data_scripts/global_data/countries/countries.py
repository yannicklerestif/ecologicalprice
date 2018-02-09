import json
import utils
from typing import List, Dict
import os


def get_countries_names_by_code() -> Dict[str, str]:
    countries_file_name = os.path.join(os.path.dirname(__file__), 'resources/countries.json')
    countries_list = json.load(open(countries_file_name))
    # overriding countries names when their official name is not their common name
    countries_common_names = utils.parse_csv_file('resources/countries_common_names.csv', __file__, '\t')
    countries_names_by_code = {}
    for country in countries_list:
        countries_names_by_code[country['Code']] = country['Name']
    for country in countries_common_names:
        countries_names_by_code[country[0]] = country[2]
    return countries_names_by_code


def get_countries_codes_by_name() -> Dict[str, str]:
    countries_names_by_code = get_countries_names_by_code().items()
    result = {}
    for (code, name) in countries_names_by_code:
        result[name] = code
    return result


def get_countries_sql() -> List[str]:
    result: List[str] = []
    for (code, name) in get_countries_names_by_code().items():
        result.append("insert into g_country (code, name) "
                      "values ('{0}', '{1}');"
                      .format(code, utils.escape_simple_quotes(name)))
    return result


if __name__ == '__main__':
    countries_sql: List[str] = get_countries_sql()
    utils.print_list(countries_sql)
