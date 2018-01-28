import json
import utils


def get_countries():
    return json.load(open('countries.json'))


def get_countries_by_name():
    countries = get_countries()
    result = {}
    for country in countries:
        result[country['Name']] = country
    return result


def print_countries():
    countries = get_countries()
    for country in countries:
        print('insert into country (code, name, source_id) '
              'values (\'{0}\', \'{1}\', 3);'
              .format(country['Code'], utils.escape_simple_quotes(country['Name'])))


if __name__ == '__main__':
    print_countries()