export function StatsComponent() {
  return (
    <div className="container container-big">
                <div className="row text-center">
                    <div className="col-sm-6 col-lg-3 my-2">
                        <div className="bg-light rounded-xl py-5 px-3">
                            <div className="mb-3">
                                <i className="fa fa-user-tie fa-2x text-primary-dark"></i>
                            </div>
                            <div className="text-uppercase text-muted font-weight-bold mb-1">Accounts</div>
                            <div className="h2 mb-0">12.582</div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 my-2">
                        <div className="bg-light rounded-xl py-5 px-3">
                            <div className="mb-3">
                                <i className="fa fa-business-time fa-2x text-primary-dark"></i>
                            </div>
                            <div className="text-uppercase text-muted font-weight-bold mb-1">Businesses</div>
                            <div className="h2 mb-0">15.000</div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 my-2">
                        <div className="bg-light rounded-xl py-5 px-3">
                            <div className="mb-3">
                                <i className="fa fa-chart-line fa-2x text-primary-dark"></i>
                            </div>
                            <div className="text-uppercase text-muted font-weight-bold mb-1">Sales</div>
                            <div className="h2 mb-0">589.563</div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 my-2">
                        <div className="bg-light rounded-xl py-5 px-3">
                            <div className="mb-3">
                                <i className="fa fa-hand-holding-usd fa-2x text-primary-dark"></i>
                            </div>
                            <div className="text-uppercase text-muted font-weight-bold mb-1">Donations</div>
                            <div className="h2 mb-0"><small className="align-top">$</small>760.584</div>
                        </div>
                    </div>
                </div>
            </div>
  );
}
