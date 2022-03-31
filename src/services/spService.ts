import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

let Category: string;
let ListName: any;
export default class spservices {
  constructor(private context: any, category, listName) {
    sp.setup({ sp: { baseUrl: this.context.pageContext.web.absoluteUrl } });
    Category = category;
    ListName = listName;
  }

  public GetItems(ItemCount): Promise<any[]> {
    var ItemNum: number;
    let today = new Date();
    let futureDate: any = new Date();
    let offsetDays = 365;
    futureDate.setDate(
      futureDate.getDate() + offsetDays,
      futureDate.getMonth(),
      futureDate.getFullYear()
    );
    if (ItemCount > 0) {
      ItemNum = ItemCount;
    } else {
      ItemNum = 1;
    }
    if (Category == undefined) {
      var filterString = `EventDate ge datetime'${today.toISOString()}' and EventDate le datetime'${futureDate.toISOString()}'`;
      return sp.web.lists
        .getByTitle(ListName)
        .items.filter(filterString)
        .top(ItemNum)
        .orderBy("EventDate", true)
        .get();
    } else if (Category != "") {
      var filterString = `EventDate ge datetime'${today.toISOString()}' and EventDate le datetime'${futureDate.toISOString()}' and Category eq '${Category}'`;
      return sp.web.lists
        .getByTitle(ListName)
        .items.filter(filterString)
        .top(ItemNum)
        .orderBy("EventDate", true)
        .get();
    } else {
      var filterString = `EventDate ge datetime'${today.toISOString()}' and EventDate le datetime'${futureDate.toISOString()}'`;
      return sp.web.lists
        .getByTitle(ListName)
        .items.filter(filterString)
        .top(ItemNum)
        .orderBy("EventDate", true)
        .get();
    }
  }
}
