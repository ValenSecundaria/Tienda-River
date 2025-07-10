import styles from "./HeaderSkeleton.module.css"

export default function HeaderSkeleton() {
  return (
    <header>
      <nav className={`${styles.skeletonNavbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top`}>
        <div className="container-fluid px-3 px-lg-4">
          {/* Mobile toggle button skeleton */}
          <div className={`${styles.skeletonBox} ${styles.mobileToggle} d-lg-none`}></div>

          {/* Logo skeleton */}
          <div className={`navbar-brand ${styles.brandContainer}`}>
            <div className={styles.logoContainer}>
              <div className={`${styles.skeletonBox} ${styles.logoSkeleton}`}></div>
              <div className={`${styles.skeletonBox} ${styles.brandTextSkeleton}`}></div>
            </div>
          </div>

          {/* Desktop menu items skeleton */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-none d-lg-flex">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="nav-item mx-3">
                  <div className={`${styles.skeletonBox} ${styles.navItemSkeleton}`}></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right icons skeleton */}
          <div className={`d-flex align-items-center gap-3 ms-auto ${styles.iconContainer}`}>
            <div className={`${styles.skeletonBox} ${styles.iconSkeleton}`}></div>
            <div className={`${styles.skeletonBox} ${styles.iconSkeleton}`}></div>
            <div className={`${styles.skeletonBox} ${styles.iconSkeleton}`}></div>
          </div>
        </div>
      </nav>
    </header>
  )
}
