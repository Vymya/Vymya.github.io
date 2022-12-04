import style from "./banner.module.css"

const Banner = () => {
    return (
        <div className={style.fullBannerSection}>
            <div className={style.bannerSection}>
                <div className={style.banner}>
                    <p className={style.bannerText}>
                        Мягкие белые подушки
                        <br/>
                        <button className={style.bannerButton}>Купить подушку</button>
                    </p>
                </div>
            </div>
            <div className={style.textSection}>
                <h2>Наши подушки</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum aliquam justo, nec suscipit lectus tincidunt nec. Aliquam vitae sapien eu quam pharetra vulputate. Phasellus iaculis velit ligula, sit amet ullamcorper ante aliquam ac.
                Donec blandit in nunc id convallis. Nam facilisis nunc at ex vulputate, vitae condimentum odio vulputate. Integer eu ultrices erat, sit amet blandit tortor. Donec dignissim massa ac tortor iaculis, id ullamcorper mauris tempus.
                </p>
                <p>
                Phasellus iaculis eget tortor non vestibulum. Proin ac vestibulum eros. In sed sapien quis lorem molestie dictum nec a nulla. Maecenas sollicitudin dictum lacus quis consectetur. Vestibulum consequat mauris ac leo iaculis, quis ullamcorper nulla tincidunt. Nullam a venenatis metus. Vivamus condimentum nulla ut nisi blandit, non tincidunt mauris tempus. Aliquam nec lacus venenatis, iaculis diam nec, mollis eros. Nam dapibus, magna pharetra pellentesque cursus, velit nibh finibus libero, in dapibus tortor dolor ut metus. Praesent tincidunt diam sed posuere sollicitudin. In molestie nisl sit amet nisl varius ultricies. Ut viverra posuere sapien lacinia aliquam. Cras non sem eu lacus dapibus consequat eu egestas ante. Praesent eu mattis metus.
                </p>
            </div>
        </div>
    )
}

export default Banner