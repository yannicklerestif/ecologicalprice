import utils
from typing import List

CROP_TYPE: int = 1

class CropObject:
    id: int
    fao_code: str
    name: str
    crop_yield: float
    crop_intensity: float

    def __init__(self, object_id, fao_code, name, crop_yield, crop_intensity):
        self.object_id = object_id
        self.fao_code = fao_code
        self.name = name
        self.crop_yield = crop_yield
        self.crop_intensity = crop_intensity


def _get_crop_objects() -> List[CropObject]:
    result: List[CropObject] = []
    crop_objects = utils.parse_csv_file('resources/crop_objects.csv', __file__, ',')
    i: int = 0
    for row in crop_objects:
        i += 1
        crop_object = CropObject(i, row[6], row[7], float(row[11]) / 10000, 1)
        result.append(crop_object)
    return result


def get_crop_objects_sql() -> List[str]:
    result: List[str] = []
    crop_objects = _get_crop_objects()
    result.append('delete from p_object where object_type = {0};'.format(CROP_TYPE))
    result.append('delete from p_crop_object;')
    for crop_object in crop_objects:
        result.append('insert into p_object (id, name, object_type) '
                      'values ({0}, \'{1}\', {2});'
                      .format(crop_object.object_id, crop_object.name + ' - 1 kg', CROP_TYPE))
        result.append('insert into p_crop_object (object_id, yield, fao_code, crop_intensity) '
                      'values ({0}, {1}, {2}, {3});'
                      .format(crop_object.object_id, crop_object.crop_yield,
                              crop_object.fao_code, crop_object.crop_intensity))
    return result


if __name__ == '__main__':
    dest_file = utils.open_dist_file('crop_objects.sql')
    utils.print_list_to_file(get_crop_objects_sql(), dest_file)
    utils.print_list(get_crop_objects_sql())