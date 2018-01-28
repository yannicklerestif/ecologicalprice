# had to remove some duplicated countries (CD, LA, MO)
import csv
import utils


# also used in currencies.py (see comment there)
def get_currencies():
    result = {}
    with open('currencies_exchange_rates.csv', encoding='utf-8') as csv_file:
        reader = csv.reader(csv_file, delimiter='\t')
        while True:
            row = next(reader)
            if not(row[0].startswith('#')):  # this also skips the header row
                break
        for row in reader:
            result[row[0]] = row
    return result


if __name__ == '__main__':
    currencies_exchange_rates = get_currencies()
    for code, row in currencies_exchange_rates.items():
        print('insert into currency_exchange_rate (currency_code, units_per_USD, source_id) '
              'values (\'{0}\', {1}, 6);'
              .format(row[0], row[2]))
