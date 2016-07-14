import kerkee from 'kerkee'
import KCcache from 'clientApi/KCcache'
import KCclientInfo from 'clientApi/KCclientInfo'
import KCwidget from 'clientApi/KCwidget'
import { KCpageInstances } from 'clientApi/KCpage'
import KCsettingsApi from 'clientApi/KCsettingsApi'
import KCsocialApi from 'clientApi/KCsocialApi'
import KCtestApi from 'clientApi/KCtestApi'
import KCucApi from 'clientApi/KCucApi'

var Dm = {};

Dm.cache = KCcache;
Dm.clientInfo = KCclientInfo;
Dm.widget = KCwidget;
Dm.page = KCpageInstances;
Dm.setting = KCsettingsApi;
Dm.social = KCsocialApi;
Dm.test = KCtestApi;
Dm.user = KCucApi;

export default Dm
