import { api } from '../service/api'
import http from '../service'
import '../mock';

global.$api = api
global.$http = http
global.$themeColor = '#1890ff'