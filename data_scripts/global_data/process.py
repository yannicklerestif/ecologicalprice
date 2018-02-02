import os
import utils
from typing import List
from io import TextIOWrapper
from global_data.countries import countries
from global_data.currencies import currencies
from global_data.countries_avg_prices import countries_avg_prices

first_header = True


def process():
    output: TextIOWrapper = utils.open_dist_file('global.sql')

    # Countries
    write_header(output, 'Countries')
    append_ddl_file(output, 'countries/ddl/countries_ddl.sql')
    utils.print_list_to_file(countries.get_countries_sql(), output)

    # Currencies
    write_header(output, 'Currencies')
    append_ddl_file(output, 'currencies/ddl/currencies_ddl.sql')
    utils.print_list_to_file(currencies.get_currencies_sql(), output)

    # Avg prices
    write_header(output, 'Avg prices')
    append_ddl_file(output, 'countries_avg_prices/ddl/country_avg_prices_ddl.sql')
    utils.print_list_to_file(countries_avg_prices.get_avg_prices_sql(), output)


def write_header(file: TextIOWrapper, header_name: str):
    global first_header
    if not first_header:
        file.write('\n\n')
    else:
        first_header = False
    file.write('-- ' + header_name + '\n\n')


def append_ddl_file(dest: TextIOWrapper, relative_source_file_name: str):
    source_file: TextIOWrapper = utils.open_relative_file(__file__, relative_source_file_name)
    dest.write(source_file.read() + '\n')


if __name__ == '__main__':
    process()
