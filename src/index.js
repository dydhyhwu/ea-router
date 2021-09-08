import RouteGenerator from './generator';
import { RouteName } from './decorators/RouteName';
import { Context, EnableProp } from './decorators/Context';
import { Alias } from './decorators/Alias';
import { Meta } from './decorators/Meta';
import {Redirect, RedirectByName} from './decorators/Redirect';

export default RouteGenerator;
export { RouteName, Context, EnableProp, Alias, Meta, Redirect, RedirectByName };
