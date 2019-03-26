import { Component } from "react"
import React from "react"
import cls from './timeline.module.scss'
export default class TimelineBlock extends Component {
  render() {
    return (
      <div className={cls.timeline}>
        <div className={cls.items}>
          <div className={cls.timeline__item}>
            <h6 className={cls.timeline__heading}>2015</h6>
            <p className={cls.timeline__title}>北京采撷科技有限公司成立</p>
            <p className={cls.timeline__subtitle}>
              为传统教育机构提供在线教育平台系统服务
            </p>
          </div>
          <div className={cls.timeline__item}>
            <h6 className={cls.timeline__heading}>2017</h6>
            <p className={cls.timeline__title}>稳步发展</p>
            <p className={cls.timeline__subtitle}>
              深化定位，更专注于产品技术创新服务
            </p>
          </div>
          <div className={cls.timeline__item}>
            <h6 className={cls.timeline__heading}>2018</h6>
            <p className={cls.timeline__title}>厚积薄发</p>
            <p className={cls.timeline__subtitle}>
              自主企业内容云 Headless 系统
            </p>
          </div>
        </div>
      </div>
    )
  }
}
