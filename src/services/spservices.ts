import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

// Class Services
export default class spservices {
  constructor(private context: any) {
    // Setuo Context to PnPjs and MSGraph
    sp.setup({
      spfxContext: this.context,
    });
  }

  public async getListItem(listId: any, viewFields: any, expandFields: any) {
    try {
      var event = await sp.web.lists
        .getByTitle(listId)
        .items.select(viewFields)
        .expand(expandFields)
        .get();

      return event;
    } catch (err) {
      return [];
    }
  }

  public async getListDetails(listId: any) {
    try {
      var event = await sp.web.lists.getById(listId).get();
      return event;
    } catch (err) {
      return [];
    }
  }
}
