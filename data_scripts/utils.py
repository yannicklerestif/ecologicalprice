import csv
import os
import sys
import typing
from typing import List, Iterator
from io import TextIOWrapper

def escape_simple_quotes(str):
    return str.replace("'", "\\'")


def parse_csv_file(file_name, relative_to, delimiter):
    absolute_file_name: str = os.path.join(os.path.dirname(relative_to), file_name)
    with open(absolute_file_name, encoding='utf-8') as csv_file:
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


def print_list(sql: Iterator[str]):
    for row in sql:
        sys.stdout.buffer.write(row.encode('utf-8'))
        print()


def print_list_to_file(sql: Iterator[str], dest: TextIOWrapper):
    for row in sql:
        dest.write(row)
        dest.write('\n')


def open_relative_file(script_file: str, relative_file_name: str) -> TextIOWrapper:
    script_dir_path: str = os.path.dirname(script_file)
    file_path = os.path.abspath(os.path.join(script_dir_path, relative_file_name))
    return open(file_path, 'r', encoding='utf-8')


def open_dist_file(file_name: str) -> TextIOWrapper:
    script_dir_path: str = os.path.dirname(__file__)
    dist_dir_path = os.path.join(script_dir_path, os.pardir, 'dist')
    dist_file_path = os.path.abspath(os.path.join(dist_dir_path, file_name))
    return open(dist_file_path, 'w', encoding='utf-8')



