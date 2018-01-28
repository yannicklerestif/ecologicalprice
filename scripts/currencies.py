# had to remove some duplicated countries (CD, LA, MO)
import csv
import utils
import currencies_exchange_rates

rates = currencies_exchange_rates.get_currencies()
with open('currencies.csv', encoding='utf-8') as csv_file:
    reader = csv.reader(csv_file, delimiter='\t')
    next(reader)  # skipping first (header) row
    for row in reader:
        # names are better in currencies_exchange_rates.csv, we try to get them from there
        rate = rates.get(row[1])
        if rate is None:
            name = row[0]
        else:
            name = rate[1]
        print('insert into currency (code, name, symbol, source_id) '
              'values (\'{0}\', \'{1}\', \'{2}\', 5);'
              .format(row[1], name, row[2]))

