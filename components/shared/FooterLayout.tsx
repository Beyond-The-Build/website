export function FooterLayout() {
  return (
    <div className="position-relative overflow-hidden">

    <span className="square square-flipped square-1"></span>
    <span className="square square-flipped square-2"></span>

    <footer className="position-relative">
        <div className="container container-footer text-center">
            <h2 className="font-weight-bold mb-2">
                Get your own account
            </h2>
            <p className="lead font-weight-normal text-muted mb-4">
                Only a few spots remain available, so hurry up!
            </p>
            <a href="javascript:void(0)" className="btn btn-primary rounded-pill shadow-lg py-3 px-4 px-md-5 m-1">
                <i className="fa fa-thumbs-up text-white-90 mr-1"></i> Subscribe
            </a>
            <p className="my-5">
                Crafted with <i className="fa fa-heart text-danger"></i> by <a className="text-primary font-weight-600" href="https://pixelcave.com/">pixelcave</a>
            </p>
        </div>
    </footer>

</div>
  );
}
