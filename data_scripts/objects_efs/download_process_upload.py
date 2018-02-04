import requests
from requests.auth import HTTPBasicAuth
from typing import List, Dict
from objects_efs import object_ef, generate_objects_efs
from objects_efs.object_ef import SITE_ROOT, ObjectEf


def _get_objects_data():
    admin_name = object_ef.ADMIN_NAME
    admin_password = object_ef.get_admin_password()
    r = requests.get(f'{SITE_ROOT}/download_objects_data.php',
                     auth=HTTPBasicAuth(admin_name, admin_password))
    return r.json()


def _to_vanilla_objects(object_efs: List[ObjectEf]):
    result = []
    for object_ef_ in object_efs:
        result.append({
            'object_id': object_ef_.object_id,
            'EF': object_ef_.ef})
    return result


def _upload_efs(objects_efs):
    admin_name = object_ef.ADMIN_NAME
    admin_password = object_ef.get_admin_password()
    vanilla_efs = _to_vanilla_objects(objects_efs)
    r = requests.post(f'{SITE_ROOT}/upload_generated_efs.php',
                      json=vanilla_efs,
                      auth=HTTPBasicAuth(admin_name, admin_password))
    print(f'\nstatus code: {r.status_code}')
    print(r.text)


def process():
    objects_data = _get_objects_data()
    objects_efs = generate_objects_efs.get_objects_efs(objects_data)
    _upload_efs(objects_efs)


if __name__ == '__main__':
    process()
