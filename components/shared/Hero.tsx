export function HeroComponent() {
  return (
    <div className="container">
        <header className="py-4">
                    <div className="row">
                        <div className="col-lg-3 col-xl-4 py-2 text-center text-lg-left d-lg-flex align-items-lg-center">
                            <a className="h4 text-primary" href="">
                                <i className="fab fa-cloudsmith mr-1"></i> <span className="text-primary-dark">App</span>
                            </a>
                        </div>
                        <div className="col-lg-6 col-xl-4 py-2">
                            <nav className="nav nav-header d-flex justify-content-center align-items-center justify-content-lg-center">
                                <a className="nav-link active" href="javascript:void(0)">Home</a>
                                <a className="nav-link" href="javascript:void(0)">Features</a>
                                <a className="nav-link" href="javascript:void(0)">Contact</a>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-xl-4 py-2">
                            <nav className="nav nav-header d-flex justify-content-center align-items-center justify-content-lg-end">
                                <a className="nav-link" href="javascript:void(0)">
                                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                                </a>
                                <a className="nav-link" href="javascript:void(0)">
                                    <i className="fa fa-plus-square mr-1"></i> Register
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="row py-lg-5">
                    <div className="col-lg-6 py-5 text-center text-lg-left">
                        <h1 className="font-weight-bold mb-4">
                            We help your business grow
                        </h1>
                        <p className="lead font-weight-normal text-muted mb-5">
                            We provide a sophisticated analytics platform to help you improve your conversions and rocket grow your business.
                        </p>
                        <a href="javascript:void(0)" className="btn btn-primary rounded-pill shadow-lg py-3 px-4 px-md-5 m-1">
                            <i className="fa fa-thumbs-up text-white-90 mr-1"></i> Subscribe
                        </a>
                        <a href="javascript:void(0)" className="btn btn-dark rounded-pill shadow-lg py-3 px-4 px-md-5 m-1">
                            <i className="fa fa-briefcase text-white-90 mr-1"></i> Projects
                        </a>
                    </div>
                    <div className="col-lg-5 offset-lg-1 py-5 text-center">
                        {/* <img className="img-fluid img-clip-overlay" src="assets/media/various/hero-image.jpg" srcset="assets/media/various/hero-image@2x.jpg 2x" alt="Hero Image"> */}
                    </div>
                </div>
    </div>
  );
}
