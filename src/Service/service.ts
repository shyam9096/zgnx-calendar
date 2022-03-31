import { sp, List } from "@pnp/sp/presets/all";
import pnp, { Field } from 'sp-pnp-js';
import { Web } from "@pnp/sp/webs";
export default class DisplayTemplatesService {
  
    public async getItems(Listname,SiteUrl) {
        let web = new (Web as any)(SiteUrl);
        let data = //await pnp.sp.
        await web.lists
        .getByTitle(Listname)
        .items
        .select("Thumbnail","Title","Id","VideoTitle")
        .orderBy("Id")
        .get()
        .then();
        return data;
    }

}