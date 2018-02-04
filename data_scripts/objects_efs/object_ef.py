class ObjectEf:
    object_id: int
    ef: float

    def __init__(self, object_id, ef):
        self.object_id = object_id
        self.ef = ef

    def __str__(self):
        return 'ObjectEf {{object_id: {0}, ef: {1}}}'.format(self.object_id, self.ef)

    def __repr__(self):
        return str(self)


