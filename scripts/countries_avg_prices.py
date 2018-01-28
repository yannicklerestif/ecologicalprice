# had to remove some duplicated countries (CD, LA, MO)
import csv
import sys
import countries
import utils


def check_countries_names():
    countries_by_names = countries.get_countries_by_name()
    with open('countries_ppp_gdp.csv', encoding='utf-8') as csv_file:
        reader = csv.reader(csv_file, delimiter='\t')
        next(reader)  # skipping first (header) row
        for row in reader:
            name = row[1].strip()
            print(name)
            found = countries_by_names.get(name)
            if found is not None:
                print(found)
            else:
                print('--------------------------------------')


if __name__ == '__main__':
    check_countries_names()