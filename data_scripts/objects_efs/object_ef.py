import utils

SITE_ROOT = 'https://ecologicalprice.org/generate_EF'


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


def get_admin_password() -> str:
    admin_password_file = utils.open_relative_file(__file__, 'admin_password')
    return admin_password_file.read()


ADMIN_NAME = 'Yannick'
