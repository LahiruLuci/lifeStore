let acm;

function createAdmin() {
    const createAdminModal = document.getElementById("createAdminModal");
    acm = new bootstrap.Modal(createAdminModal);
    acm.show();
}

let cdm;

function customerSearch() {
    window.location.href = 'customerDetails.html';
}

function CustomerSingleProductView() {
    const productListViewId = document.getElementById("productListViewId");
    const singleProductViewId = document.getElementById("singleProductViewId");
    productListViewId.classList.add("d-none");
    singleProductViewId.classList.remove("d-none");
}

function AdminSingleProductView() {
    const productListViewId = document.getElementById("productListViewId");
    const singleAdminProductViewId = document.getElementById("singleAdminProductViewId");
    productListViewId.classList.add("d-none");
    singleAdminProductViewId.classList.remove("d-none");
}

function SingleProductView() {
    const productListViewId = document.getElementById("productListViewId");
    const singleProductViewId = document.getElementById("singleProductViewId");
    const addProductViewId = document.getElementById("addProductViewId");
    const singleUpdateProductViewId = document.getElementById("singleUpdateProductViewId");
    productListViewId.classList.add("d-none");
    addProductViewId.classList.add("d-none");
    singleUpdateProductViewId.classList.add("d-none");
    singleProductViewId.classList.remove("d-none");
}

function updateProductView() {
    const productListViewId = document.getElementById("productListViewId");
    const singleProductViewId = document.getElementById("singleProductViewId");
    const singleUpdateProductViewId = document.getElementById("singleUpdateProductViewId");
    const addProductViewId = document.getElementById("addProductViewId");
    productListViewId.classList.add("d-none");
    singleProductViewId.classList.add("d-none");
    addProductViewId.classList.add("d-none");
    singleUpdateProductViewId.classList.remove("d-none");
}

function addSingleProductview() {
    const productListViewId = document.getElementById("productListViewId");
    const singleProductViewId = document.getElementById("singleProductViewId");
    const singleUpdateProductViewId = document.getElementById("singleUpdateProductViewId");
    const addProductViewId = document.getElementById("addProductViewId");
    productListViewId.classList.add("d-none");
    singleProductViewId.classList.add("d-none");
    singleUpdateProductViewId.classList.add("d-none");
    addProductViewId.classList.remove("d-none");

}


let dpa;

function DeleteProductAsk() {
    const productDeleteSelectionMessageModal = document.getElementById("product_delete_selection_message_modal");
    const deleteselectionMsgDescriptionHead = document.getElementById("deleteselectionMsgDescriptionHead");
    deleteselectionMsgDescriptionHead.innerText = "Do you want to delete this selected item ? ";
    dpa = new bootstrap.Modal(productDeleteSelectionMessageModal);
    dpa.show();
}

let upa;

function UpdateProductAsk() {
    const productEditSelectionMessageModal = document.getElementById("product_edit_selection_message_modal");
    const editselectionMsgDescriptionHead = document.getElementById("editselectionMsgDescriptionHead");
    editselectionMsgDescriptionHead.innerText = "Do you want to update this selected item ? ";
    upa = new bootstrap.Modal(productEditSelectionMessageModal);
    upa.show();
}

let advca;

function AdminDeleteViewClickAsk() {
    const productDeleteSelectionMessageModal = document.getElementById("admin_delete_selection_message_modal");
    const deleteselectionMsgDescriptionHead = document.getElementById("deleteselectionMsgDescriptionHead");
    deleteselectionMsgDescriptionHead.innerText = "Do you want to remove selected admin ? ";
    advca = new bootstrap.Modal(productDeleteSelectionMessageModal);
    advca.show();
}

let aevca;

function AdminEditViewClickAsk() {
    const productEditSelectionMessageModal = document.getElementById("admin_edit_selection_message_modal");
    const editselectionMsgDescriptionHead = document.getElementById("editselectionMsgDescriptionHead");
    editselectionMsgDescriptionHead.innerText = "Do you want to update selected admin ? ";
    aevca = new bootstrap.Modal(productEditSelectionMessageModal);
    aevca.show();
}

let aavca;

function AdminAddViewClickAsk() {
    const productAddSelectionMessageModal = document.getElementById("admin_add_selection_message_modal");
    const addselectionMsgDescriptionHead = document.getElementById("addselectionMsgDescriptionHead");
    addselectionMsgDescriptionHead.innerText = "Do you want to add this admin ? ";
    aavca = new bootstrap.Modal(productAddSelectionMessageModal);
    aavca.show();
}

let suva;

function SubscriptionsUnsubscribeViewAsk(){
    const productUnsubscribeSelectionMessageModal = document.getElementById("product_unsubscribe_selection_message_modal");
    const unsubscribeselectionMsgDescriptionHead = document.getElementById("unsubscribeselectionMsgDescriptionHead");
    unsubscribeselectionMsgDescriptionHead.innerText = "Do you want to unsubscribe this product ? ";
    suva = new bootstrap.Modal(productUnsubscribeSelectionMessageModal);
    suva.show();
}

let asuva;

function SubscriptionsUnsubscribeViewAsk2(){
    const adminproductUnsubscribeSelectionMessageModal = document.getElementById("admin_product_unsubscribe_selection_message_modal");
    const adminunsubscribeselectionMsgDescriptionHead = document.getElementById("adminunsubscribeselectionMsgDescriptionHead");
    adminunsubscribeselectionMsgDescriptionHead.innerText = "Do you want to unsubscribe this product ? ";
    asuva = new bootstrap.Modal(adminproductUnsubscribeSelectionMessageModal);
    asuva.show();
}

let sesva;

function SubscriptionsEmailSendViewAsk(){
    const emailEendMessageModal = document.getElementById("email_send_message_modal");
    const emailMsgDescriptionHead = document.getElementById("emailMsgDescriptionHead");
    const emailMsgDescriptionHead2 = document.getElementById("emailMsgDescriptionHead2");
    emailMsgDescriptionHead.innerText = "Do you want to send your subscription details to your default email ? ";
    emailMsgDescriptionHead2.innerText = localStorage.getItem('user_email');
    sesva = new bootstrap.Modal(emailEendMessageModal);
    sesva.show();
}

let asesva;

function SubscriptionsEmailSendViewAsk2(){
    const adminEmailSendMessageModal = document.getElementById("admin_email_send_message_modal");
    const adminEmailMsgDescriptionHead = document.getElementById("adminEmailMsgDescriptionHead");
    const adminEmailMsgDescriptionHead2 = document.getElementById("adminEmailMsgDescriptionHead2");
    adminEmailMsgDescriptionHead.innerText = "Do you want to send your subscription details to your default email ? ";
    adminEmailMsgDescriptionHead2.innerText = localStorage.getItem('user_email');
    asesva = new bootstrap.Modal(adminEmailSendMessageModal);
    asesva.show();
}

let eav;

function EditAdminView() {
    const editAdminModal = document.getElementById("editAdminModal");
    eav = new bootstrap.Modal(editAdminModal);
    eav.show();
}

let lkv;

function LiceseKeyView() {
    const liceseKeyViewModal = document.getElementById("liceseKeyViewModal");
    lkv = new bootstrap.Modal(liceseKeyViewModal);
    lkv.show();
}

let adminlkv;

function AdminLiceseKeyView() {
    const adminLiceseKeyViewModal = document.getElementById("adminLiceseKeyViewModal");
    adminlkv = new bootstrap.Modal(adminLiceseKeyViewModal);
    adminlkv.show();
}

let slkv;

function SubscribedLiceseKeyView() {
    const liceseKeySubscribedViewModal = document.getElementById("liceseKeySubscribedViewModal");
    slkv = new bootstrap.Modal(liceseKeySubscribedViewModal);
    slkv.show();
}

let uslkv;

function UnsubscribedLiceseKeyView() {
    const liceseKeyUnsubscribedViewModal = document.getElementById("liceseKeyUnsubscribedViewModal");
    uslkv = new bootstrap.Modal(liceseKeyUnsubscribedViewModal);
    uslkv.show();
}

let alkv;

function AllLiceseKeyView() {
    const liceseKeyAllViewModal = document.getElementById("liceseKeyAllViewModal");
    alkv = new bootstrap.Modal(liceseKeyAllViewModal);
    alkv.show();
}

let cav;

function createAdminView() {
    const createAdminModal = document.getElementById("createAdminModal");
    cav = new bootstrap.Modal(createAdminModal);
    cav.show();
}

function customerSearchView(sltbbid) {
    if (sltbbid) {
        localStorage.setItem('customer_id', sltbbid);
        window.location.href = '/superAdminCustomerDetails';
    } else {
        alert("Please enter a Broadband ID");
    }
}

function customerSearchView2(sltbbid) {
    localStorage.setItem('customer_id', sltbbid);
    window.location.href = '/adminProductList';
}

function productView() {
    window.location.href = 'singleProductView.html';
}

let logRoleSelector;

// function LogIn(fetchedUserRole) {
//     let user_id = localStorage.getItem('user_id')
//     if (fetchedUserRole == 1) {
//         localStorage.setItem('customer_id', user_id);
//         window.location.href = '/home';
//     } else if (fetchedUserRole == 2) {
//         localStorage.setItem('admin_id', user_id);
//         window.location.href = '/adminHome';
//     } else if (fetchedUserRole == 3) {
//         localStorage.setItem('super_admin_id', user_id);
//         window.location.href = '/dashboard';
//     } else {
//         alert("Something went Worng!")
//     }
// }

function movetoProductList() {
    window.location.href = '/productList';
}

let gp;

function generatePDF() {
    const customerPdfModal = document.getElementById("customerPdfModal");
    gp = new bootstrap.Modal(customerPdfModal);
    gp.show();
}

function addProductView() {
    window.location.href = 'addSingleProductView.html';
}


function updateProduct() {
    window.location.href = 'updateSingleProduct.html';
}