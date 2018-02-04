from typing import List, Dict


def test():
    some_var: Dict[str, List[str]] = {'test': ['a', 'b']}
    some_list = some_var['test']
    some_list.append('c')
    print(some_var)


if __name__ == '__main__':
    test()