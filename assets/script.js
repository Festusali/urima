// Assigns corresponding value to price based on Net quantity
function checkForm() {
  orderQty = document.orderForm.quantity;
  if (orderQty.value == 1) {
    document.orderForm.price.value = "₦20,000";
    return true;
  }
  if (orderQty.value == 2) {
    document.orderForm.price.value = "₦30,000";
    return true;
  }
  if (orderQty.value == 3) {
    document.orderForm.price.value = "₦45,000";
    return true;
  }
  if (orderQty.value == 4) {
    document.orderForm.price.value = "₦60,000";
    return true;
  }
}
