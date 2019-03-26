import { Component } from "react"
import React from "react"
import cls from "./callout.module.scss"

export default class Callout extends Component {
  render() {
    return (
      <section className={`${cls.callout} ${cls.beliefs}`}>
        <div className={cls.callout__container}>
          <p className={cls.callout__text}>
            我们坚持
            <span className={cls.callout__underline}>所有资源集中服务现有签约客户</span>，
            以声誉赢得业务。不设专门团队发展新客户，
            <span className={cls.callout__underline}>不参与比稿 </span>，
            我们真诚希望客户在充分了解采撷的前提下进行合作，
            <span className={cls.callout__underline}>期待您明智选择</span>。
          </p>

        </div>
      </section>
    )
  }
}
