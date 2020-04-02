import produce from "immer";

const INITIAL_STATE = {
  filter_data: [],
  filter_tag: [],
  available_tags: [],
  tag_search: []
};

function filterReducer(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case "@TAG/TAG_LIST_SUCCESS": {
        const { tags } = action.payload;

        draftState.available_tags = tags;

        break;
      }
      case "@TAG/FILTER_TAG_ITEM_SUCCESS": {
        const { filter_data, filter } = action.payload;
        draftState.filter_data = filter_data;

        const getFilter = draftState.available_tags.filter(
          tag => tag._id === filter._id
        );

        draftState.filter_tag.push(...getFilter);

        break;
      }
      case "@TAG/FILTER_TAG_ITEM_REMOVE": {
        const { filter: filterPayload } = action.payload;

        draftState.filter_data = draftState.filter_data.filter(
          fitler => fitler.id !== filterPayload.id
        );

        break;
      }
      case "@TAG/SEARCH_TAG_ITEM": {
        const { tag } = action.payload;

        const tagClear = tag
          .toString()
          .trim()
          .toLowerCase();

        const tags = draftState.available_tags.filter(tag =>
          tag.name.includes(tagClear)
        );

        draftState.tag_search = tags;
        break;
      }
      default:
        return state;
    }
  });
}

export default filterReducer;
