import json
import utils


def get_countries_names_by_code():
    countries_list = json.load(open('countries.json'))
    # overriding countries names when their official name is not their common name
    countries_common_names = utils.parse_csv_file('countries_common_names.csv', '\t')
    countries_names_by_code = {}
    for country in countries_list:
        countries_names_by_code[country['Code']] = country['Name']
    for country in countries_common_names:
        countries_names_by_code[country[0]] = country[2]
    return countries_names_by_code


def get_countries_codes_by_name():
    countries_names_by_code = get_countries_names_by_code().items()
    result = {}
    for (code, name) in countries_names_by_code:
        result[name] = code
    return result


def print_countries():
    for (code, name) in get_countries_names_by_code().items():
        print('insert into country (code, name, source_id) '
              'values (\'{0}\', \'{1}\', 3);'
              .format(code, utils.escape_simple_quotes(name)))


if __name__ == '__main__':
    print_countries()