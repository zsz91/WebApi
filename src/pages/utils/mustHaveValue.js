import { Toast } from 'antd-mobile';
export default function mustHaveValue(configFields,data){
  for(let item of configFields){
    if(item.required && !data[item.key] && data[item.key] !== false && data[item.key] !== 0){
      Toast.info(`${item.name}是必填项请填写`,1);
      return false;
    }
  }
  return true;
}
