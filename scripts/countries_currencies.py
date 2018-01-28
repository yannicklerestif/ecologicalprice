# had to remove some duplicated countries (CD, LA, MO)
import csv
import utils

with open('countries_currencies.csv', encoding='utf-8') as csv_file:
    reader = csv.reader(csv_file, delimiter=',')
    next(reader)  # skipping first (header) row
    for row in reader:
        print('insert into country_currency (country_code, currency_code, source_id) '
              'values (\'{0}\', \'{1}\', 4);'
              .format(row[1], row[3]))

