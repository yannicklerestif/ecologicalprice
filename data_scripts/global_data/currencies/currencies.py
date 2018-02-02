import utils
from typing import Dict, List, Iterator
import argparse
import itertools

def _get_exchange_rates_by_currency_code() -> Dict[str, Iterator[str]]:
    result = {}
    parsed = utils.parse_csv_file('resources/currencies_exchange_rates.csv', __file__, '\t')
    for row in parsed:
        result[row[0]] = row
    return result


def _get_currency_exchange_rates_sql() -> List[str]:
    """ sql for currencies exchange rates """
    result = []
    currencies_exchange_rates: Dict[str, List[str]] = _get_exchange_rates_by_currency_code()
    for code, row in currencies_exchange_rates.items():
        result.append('insert into currency_exchange_rate (currency_code, units_per_USD) '
                      'values (\'{0}\', {1});'
                      .format(row[0], row[2]))
    return result


def _get_currencies_sql() -> List[str]:
    """ sql for currencies names and symbols """
    result = []
    rates: Dict[str, List[str]] = _get_exchange_rates_by_currency_code()
    currencies = utils.parse_csv_file('resources/currencies.csv', __file__, '\t')
    for row in currencies:
        # names are better in currencies_exchange_rates.csv, we try to get them from there
        rate = rates.get(row[1])
        if rate is None:
            name = row[0]
        else:
            name = rate[1]
        result.append('insert into currency (code, name, symbol) '
                      'values (\'{0}\', \'{1}\', \'{2}\');'
                      .format(row[1], name, row[2]))
    return result


def _get_countries_currencies():
    countries_currencies = utils.parse_csv_file('resources/countries_currencies.csv', __file__, ',')
    return map(lambda row:
               'insert into country_currency (country_code, currency_code) '
               'values (\'{0}\', \'{1}\');'
               .format(row[1], row[3]), countries_currencies)


def get_currencies_sql() -> Iterator[str]:
    return itertools.chain(_get_currency_exchange_rates_sql(), [''],
                           _get_currencies_sql(), [''],
                           _get_countries_currencies())


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--exchange-rates", action="store_true")
    parser.add_argument("--currencies", action="store_true")
    parser.add_argument("--countries-currencies", action="store_true")
    args = parser.parse_args()
    if args.exchange_rates:
        utils.print_list(_get_currency_exchange_rates_sql())
    elif args.currencies:
        utils.print_list(_get_currencies_sql())
    elif args.countries_currencies:
        utils.print_list(_get_countries_currencies())
    else:
        utils.print_list(get_currencies_sql())
