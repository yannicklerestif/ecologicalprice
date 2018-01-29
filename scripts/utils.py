import csv


def escape_simple_quotes(str):
    return str.replace("'", "\\'")


def parse_csv_file(file_name, delimiter):
    with open(file_name, encoding='utf-8') as csv_file:
        reader = csv.reader(csv_file, delimiter=delimiter)
        # skip commented lines and header row
        while True:
            row = next(reader)
            if not (row[0].startswith('#')):
                break
        result = []
        for row in reader:
            result.append(row)
    return result
