export function PlansComponent() {
  return (
    <div className="container container-big">
                <h2 className="font-weight-bold mb-5 text-center">
                    Our best plans
                </h2>
                <div className="row text-center pt-5">
                    <div className="col-sm-6 col-lg-4 offset-lg-2 my-2">
                        <div className="bg-light rounded-xl py-5 px-3 relative">
                            <span className="text-back">
                                <i className="fa fa-code"></i>
                            </span>
                            <h3 className="h3 font-weight-light mb-5">Developer</h3>
                            <p className="h5 mb-4">
                                <span className="text-primary">10</span>
                                <span className="text-muted">Projects</span>
                            </p>
                            <p className="h5 mb-4">
                                <span className="text-primary">3</span>
                                <span className="text-muted">Clients</span>
                            </p>
                            <p className="h5 mb-4">
                                <span className="text-primary">100</span>
                                <span className="text-muted">Deployments</span>
                            </p>
                            <p className="h5 mb-4">
                                <span className="text-primary">Email</span>
                                <span className="text-muted">Support</span>
                            </p>
                            <p className="h4 pt-4">
                                <span className="text-success">$29</span> per month
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 my-2">
                        <div className="bg-light rounded-xl py-5 px-3 relative">
                            <span className="text-back">
                                <i className="fa fa-globe"></i>
                            </span>
                            <h3 className="h3 font-weight-light mb-5">Business</h3>
                            <p className="h5 mb-4">
                                <span className="text-primary">Unlimited</span>
                                <span className="text-muted">Projects</span>
                            </p>
                            <p className="h5 mb-4">
                                <span className="text-primary">Unlimited</span>
                                <span className="text-muted">Clients</span>
                            </p>
                            <p className="h5 mb-4">
                                <span className="text-primary">Unlimited</span>
                                <span className="text-muted">Deployments</span>
                            </p>
                            <p className="h5 mb-4">
                                <span className="text-primary">VIP</span>
                                <span className="text-muted">Support</span>
                            </p>
                            <p className="h4 pt-4">
                                <span className="text-success">$99</span> per month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
  );
}
