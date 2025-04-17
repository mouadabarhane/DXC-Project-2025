import Swal from "sweetalert2";

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You are going to Logout!",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#5f249f",
    confirmButtonText: "Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
   // window.location.href = "/login";
  });
};

export default handleLogout;
