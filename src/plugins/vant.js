// 按需全局引入 vant组件
import Vue from 'vue'
import { isZhb, isZfb, isWx, isOther, isZfbMini, isDingTalk } from '@/utils/alipay'
import {
  Toast,
  Search,
  Icon,
  Picker,
  Button,
  Cascader,
  Cell,
  CellGroup,
  Form,
  Field,
  Popup,
  Area,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Empty,
  Overlay,
  Tag,
  Image,
  Notify,
  Skeleton,
  List,
  DropdownMenu,
  DropdownItem,
  Divider,
  Col,
  Row,
  Loading,
  NavBar,
  Sticky
} from 'vant'
Vue.use(Overlay)
Vue.use(Button)
Vue.use(Cascader)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Area)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Empty)
Vue.use(Tag)
Vue.use(Image)
Vue.use(Notify)
Vue.use(Dialog)
Vue.use(Skeleton)
Vue.use(List)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Divider)
Vue.use(Col)
Vue.use(Row)
Vue.use(Loading)
Vue.use(NavBar)
Vue.use(Sticky)

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$isWx = isWx()
Vue.prototype.$isZhb = isZhb()
Vue.prototype.$isZfb = isZfb()
Vue.prototype.$isOther = isOther()
Vue.prototype.$isZfbMini = isZfbMini()
Vue.prototype.$isDingTalk = isDingTalk()
