import { Component } from "react"
import React from "react"
import cls from "./clients.module.scss"

export class ClientsBlock extends Component {
  render() {
    return (
      <section className={cls.cardGrid}>

        <div className={cls.cardGrid__container}>
          <div className={cls.cardGrid__cards}>

            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(http://www.iboyaa.cn/Home/images/logo.png)` }}></div>
                <p className={cls.clientGrid__description}>
                  我们为北京博雅智学软件股份有限公司，提供互联网产品咨询、技术人员培训、VR虚拟仿真系统研发等更多合作。
                </p>
              </div>
            </div>
            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(/assets/client/chinauff-logo.svg)` }}></div>
                <p className={cls.clientGrid__description}>
                  我们制作了周年庆H5活动应用、春节活动集福系统，并提供系统研发、服务系统运维保障等服务。</p>
              </div>
            </div>
            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(https://mat1.gtimg.com/pingjs/ext2020/newom/build/static/images/new_logo.png)` }}></div>
                <p className={cls.clientGrid__description}>我们为腾讯网提供平面产品设计服务。</p>
              </div>
            </div>
            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(/assets/client/alearning-logo.png)` }}></div>
                <p className={cls.clientGrid__description}>
                  我们为江苏至优教育科技有限公司,提供互联网技术团队培训、互联网教育系统建设服务咨询、小程序系统研发等服务。
                </p>
              </div>
            </div>
            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(/assets/client/cailian-logo.png)` }}></div>
                <p className={cls.clientGrid__description}>
                  我们为财联网提供互联网教育系统建设咨询服务，提供教育系统建设规划、投入、系统文案等。
                </p>
              </div>
            </div>
            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(/assets/client/ict-logo.jpg)` }}></div>
                <p className={cls.clientGrid__description}>
                  我们为中科院计算技术研究所提供技术培训、互联网产品咨询等服务。
                </p>
              </div>
            </div>
            <div className={cls.cardGrid__card}>
              <div className={cls.cardGrid__content}>
                <div className={cls.clientGrid__logo}
                     style={{ backgroundImage: `url(/assets/client/disney-english-logo.png)` }}></div>
                <p className={cls.clientGrid__description}>
                  我们为上海迪士尼英语提供移动端 APP UI 设计。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
