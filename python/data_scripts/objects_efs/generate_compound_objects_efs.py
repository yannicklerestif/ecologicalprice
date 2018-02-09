from typing import List, Dict
from objects_efs.object_ef import ObjectEf


class CompoundObjectLink:
    quantity: float
    parent_id: int

    def __init__(self, quantity: float, parent_id: int):
        self.quantity = quantity
        self.parent_id = parent_id


def _get_compound_object_ef(efs_by_object_id: Dict[int, float],
                            compound_objects_efs_by_id: Dict[int, float],
                            compound_objects_links_by_child_id: Dict[int, List[CompoundObjectLink]],
                            object_id: int) -> float:
    result = efs_by_object_id.get(object_id)
    if result is not None:
        # object id is not a compound object: we can end recursion
        return result
    links: List[CompoundObjectLink] = compound_objects_links_by_child_id[object_id]
    if links is None:
        raise Exception(f'no ef in root objects for {object_id}, but no parents either')
    result = 0
    for link in links:
        ef = _get_compound_object_ef(efs_by_object_id,
                                     compound_objects_efs_by_id,
                                     compound_objects_links_by_child_id,
                                     link.parent_id)
        result += ef * link.quantity
    compound_objects_efs_by_id[object_id] = result
    return result


# modifying structures to better fit recursion -----------------------------

def _get_compound_links_by_child_id(compound_objects_links) -> Dict[int, List[CompoundObjectLink]]:
    result: Dict[int, List[CompoundObjectLink]] = {}
    for compound_object_link_ in compound_objects_links:
        child_id: int = compound_object_link_['object_id']
        compound_object_link = CompoundObjectLink(
            compound_object_link_['quantity'],
            compound_object_link_['parent_id'])
        existing_parents = result.get(child_id)
        if existing_parents is None:
            existing_parents = []
            result[child_id] = existing_parents
        existing_parents.append(compound_object_link)
    return result


def _get_efs_by_object_id(efs: List[ObjectEf]) -> Dict[int, float]:
    result: Dict[int, float] = {}
    for ef in efs:
        result[ef.object_id] = ef.ef
    return result


# main function ------------------------------------------------------------

def get_compound_objects_efs(efs: List[ObjectEf],
                             compound_objects_links: List[any]) -> Dict[int, float]:
    compound_links_by_child_id = _get_compound_links_by_child_id(compound_objects_links)
    efs_by_object_id = _get_efs_by_object_id(efs)
    compound_objects_efs = {}
    for (object_id, _) in compound_links_by_child_id.items():
        _get_compound_object_ef(
            efs_by_object_id,
            compound_objects_efs,
            compound_links_by_child_id,
            object_id)
    return compound_objects_efs


# tests ---------------------------------------------------------------------

def run_tests():
    efs = [
        ObjectEf(1, 1.0),
        ObjectEf(10, 10.0),
        ObjectEf(100, 100.0),
        ObjectEf(1000, 1000.0)
    ]
    compound_object_links = [
        {'object_id': 21, 'parent_id': 1, 'quantity': 1.0},
        {'object_id': 21, 'parent_id': 10, 'quantity': 2.0},
        {'object_id': 5400, 'parent_id': 100, 'quantity': 4.0},
        {'object_id': 5400, 'parent_id': 1000, 'quantity': 5.0},
        {'object_id': 570, 'parent_id': 10, 'quantity': 3.0},
        {'object_id': 570, 'parent_id': 5400, 'quantity': 0.1},
    ]
    compound_objects_efs: Dict[int, float] = get_compound_objects_efs(efs, compound_object_links)
    print(compound_objects_efs)
    assert compound_objects_efs.get(21) == 21.0
    assert compound_objects_efs.get(5400) == 5400.0
    assert compound_objects_efs.get(570) == 570.0
    assert len(compound_objects_efs) == 3


if __name__ == '__main__':
    run_tests()


