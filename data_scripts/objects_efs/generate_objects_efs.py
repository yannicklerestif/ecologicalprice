import requests
from typing import List, Dict
from objects_efs.object_ef import ObjectEf

SITE_ROOT = 'https://ecologicalprice.org/generate_EF/'


def _get_objects_data():
    r = requests.get(SITE_ROOT + 'download_objects_data.php')
    return r.json()


def _get_eqf(eqfs, type):
    for eqf in eqfs:
        if eqf['type_id'] == type:
            return eqf['ef']
    raise Exception(f'{type} not found in {eqfs}')


# Formulas -------------------------------------------------------------

def _compute_co2_ef(co2_ef: float, object_co2_cost: float):
    return co2_ef * object_co2_cost


def _compute_crop_ef(crop_eqf, object_yield, crop_intensity):
    # 1000: yields are in tons but we want crop objects in kg
    return crop_eqf / (object_yield * 1000 * crop_intensity)


def _compute_livestock_ef(total_produced, total_ecological_footprint, retail_cut_percent):
    return total_ecological_footprint / total_produced / retail_cut_percent


# ----------------------------------------------------------------------

def _get_co2_objects_efs(co2_ef: float, co2_objects) -> List[ObjectEf]:
    result: List[ObjectEf] = []
    for co2_object in co2_objects:
        ef: float = _compute_co2_ef(co2_ef, co2_object['CO2_cost'])
        result.append(ObjectEf(co2_object['object_id'], ef))
    return result


def _get_crop_objects_efs(eqfs, crop_objects) -> List[ObjectEf]:
    result: List[ObjectEf] = []
    crop_eqf = _get_eqf(eqfs, 1)
    for crop_object in crop_objects:
        ef: float = _compute_crop_ef(crop_eqf, crop_object['yield'], crop_object['crop_intensity'])
        result.append(ObjectEf(crop_object['object_id'], ef))
    return result


def _get_livestock_objects_efs(livestock_objects) -> List[ObjectEf]:
    result: List[ObjectEf] = []
    for livestock_object in livestock_objects:
        ef: float = _compute_livestock_ef(
            livestock_object['total_produced'],
            livestock_object['total_ecological_footprint'],
            livestock_object['retail_cut_percent'])
        result.append(ObjectEf(livestock_object['object_id'], ef))
    return result


# --------------------------------------------------------------------

def process():
    objects_data = _get_objects_data()
    co2_objects_efs = _get_co2_objects_efs(
        objects_data['p_CO2_ecological_footprint'][0]['value'],
        objects_data['p_CO2_object'])
    crop_objects_efs = _get_crop_objects_efs(
        objects_data['p_equivalent_factor'],
        objects_data['p_crop_object'])
    livestock_objects_efs = _get_livestock_objects_efs(
        objects_data['p_livestock_object'])
    _pretty_print(objects_data['p_object'],
                  co2_objects_efs
                  + crop_objects_efs
                  + livestock_objects_efs)


def _pretty_print(objects, objects_efs: List[ObjectEf]):
    objects_by_id: Dict[int, any] = {}
    for object_ in objects:
        objects_by_id[object_['id']] = object_
    for object_ef in objects_efs:
        object_ = objects_by_id[object_ef.object_id]
        print(f'{object_["name"]:40}{object_["object_type"]:2}{(float(object_ef.ef)*6150):15,.3f}')


if __name__ == '__main__':
    process()