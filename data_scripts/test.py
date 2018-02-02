def test():
    def inner(x: int) -> int:
        return x * 2
    result = map(inner, range(0, 10))
    print(list(result))


if __name__ == '__main__':
    test()