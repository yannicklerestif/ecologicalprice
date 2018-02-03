from typing import Iterator
import utils
from global_data.countries_avg_prices import countries_avg_prices


def get_other_sql() -> Iterator[str]:
    return ['insert into g_world_ppp_gdp (value) values ({0});'
            .format(countries_avg_prices.get_world_ppp_gdp())]


if __name__ == '__main__':
    utils.print_list(get_other_sql())