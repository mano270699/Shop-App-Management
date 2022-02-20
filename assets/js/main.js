const urlDashBoard = "http://127.0.0.1:3000";
$(window).on("load", function() {

    if ($("#title").text().includes("لوحة التحكم")) {

        $.get(urlDashBoard + "/api/dashboard/getTodayMoney", function(data, status) {
            //  console.log(data);
            if (data[0]['total_priceToday'] == '' || data[0]['total_priceToday'] == null) {
                $("#totalToday").text(0);
            } else {
                $("#totalToday").text(data[0]['total_priceToday']);
            }


        });
        $.get(urlDashBoard + "/api/dashboard/getMonthlyMoney", function(data, status) {
            // console.log(data);
            if (data[0]['total_priceMonthly'] == '' || data[0]['total_priceMonthly'] == null)
                $("#totalMonthly").text(0);
            else
                $("#totalMonthly").text(data[0]['total_priceMonthly']);

        });
        $.get(urlDashBoard + "/api/dashboard/getYearMoney", function(data, status) {
            //console.log(data);
            if (data[0]['total_priceYear'] == '' || data[0]['total_priceYear'] == null)
                $("#totalYear").text(0);
            else
                $("#totalYear").text(data[0]['total_priceYear']);

        });




    } else return;


});
$(window).on("load", function() {

    if ($("#titleSetting").text().includes("الأعدادات")) {

        $.get(urlDashBoard + "/api/dashboard/getTodayInvoice", function(data, status) {
            // console.log(data);
            $("#allTodayInvoice").text(data);

        });
        $.get(urlDashBoard + "/api/dashboard/getMonthlyInvoice", function(data, status) {
            console.log(data);
            $("#AllMonthyInvoice").text(data);

        });
        $.get(urlDashBoard + "/api/dashboard/getYearInvoice", function(data, status) {
            //console.log(data);
            $("#allInvoice").text(data);

        });




    } else return;


});


$(document).ready(function() {

    $('#example').DataTable();
    $('#example_wrapper').addClass("p-3 bg-light");

    $("#add_category").click(function() {
        $.get("demo_test.asp", function(data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
    });























    /*---------------------------------Start Dashboard Page---------------------------------*/
    var tableDashboard = $('#TableDashboardData').DataTable({

        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Arabic.json"

        },
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/api/dashboard/getAllInvoice",

            "dataSrc": ""
        },
        "columnDefs": [{

                "targets": -1,
                "data": null,
                "render": function(data, type, row, meta) {


                    var IconActionCat = '<a id="' + row.invoice_id + '" href="#ActionRemoveInvoice" class="btn btn-icon btn-danger mb-1"><i class="far fa-trash-alt"></i></a>';

                    return IconActionCat;
                }


            }, {

                "targets": 3,
                "data": null,
                "render": function(data, type, row, meta) {


                    var IconActionDetails = '<a id="' + row.invoice_id + '" href="#ActionDetailsInvoice" class = "btn btn-info">Detail</a> ';

                    return IconActionDetails;
                }


            }, {

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    //var id = jQuery('#TableDashboardData').find('tr').index() + 1;
                    var thInvoiceID = '<b>' + row.invoice_id + '</b>';
                    return thInvoiceID;
                }


            },
            {
                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {


                    var invoice_name = '<b>' + row.invoice_name + '</b>';


                    return invoice_name;
                }
            },



            {
                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {


                    var dateTime = '<b>' + row.date_time + '</b>';


                    return dateTime;
                }
            }

        ],
        "columns": [
            { "data": "invoice_id" },
            { "data": "invoice_name" },
            { "data": "date_time" },
            { "data": "" },
            { "data": "" }


        ]

    });

    var dataModelInvoice;
    $('#TableDashboardData tbody').on('click', '[href="#ActionEditInvoice"]', function() {
        dataModelInvoice = tableDashboard.row($(this).parents('tr')).data();




    });

    $('#TableDashboardData tbody').on('click', '[href="#ActionRemoveInvoice"]', function() {
        dataModelInvoice = tableDashboard.row($(this).parents('tr')).data();
        //  $("#FormRemoveCategory span").text(dataModelCategory.Cat_Name);
        $('#ActionRemoveInvoice').modal('show');

    });

    $('#TableDashboardData tbody').on('click', '[href="#ActionDetailsInvoice"]', function() {
        dataModelInvoice = tableDashboard.row($(this).parents('tr')).data();
        //  $("#FormRemoveCategory span").text(dataModelCategory.Cat_Name);
        console.log(dataModelInvoice.invoice_id);
        var invoice_id = dataModelInvoice.invoice_id;
        window.location.replace(urlDashBoard + "/api/dashboard/invoicePage/" + invoice_id);

    });

    //add Invoice
    $("#FormaddInvoice").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();

        var txtInvoiceName = $('#_InvoiceName').val();
        if (txtInvoiceName == "" || txtInvoiceName == null) {
            var hulla = new hullabaloo();
            hulla.send('لا يمكن ترك اسم الفاتورة فارغة ', 'danger');
        } else {

            var settings = {
                "url": "http://127.0.0.1:3000/api/dashboard/addNewInvoice",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "invoice_name": txtInvoiceName,

                },


                error: function(xhr, textStatus, error) {

                    hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');


                }

            };

            $.ajax(settings, ).done(function(response) {
                var hulla = new hullabaloo();
                // hulla.send(response.msg, 'success');

                var tb = $('.tablemodalinvoice:eq(0) tbody');
                var size = tb.find("tr").length;
                //    alert(size);
                console.log("Number of rows : " + size);
                if (size == 0) {
                    var hulla = new hullabaloo();
                    hulla.send('لا يمكن انشاء فاتورة فارغة', 'danger');
                } else {
                    var textID = "";
                    var textQyt = "";
                    var textPrice = "";
                    var textTotalPrice = "";
                    tb.find("tr").each(function(index, element) {

                        // var colId = $(element).attr("data-id");
                        // console.log(colId);
                        // console.log(element);
                        // console.log($(element));
                        // alert(colId);
                        $(element).find('td').each(function(index, element) {

                            var colVal = $(element).text();


                            if (index == 0) {
                                textID = colVal.trim();
                            } else if (index == 1) {
                                textItemName = colVal.trim();
                            } else if (index == 2) {
                                //  textQyt = $("_InvoiceQuantity" + i).val()
                                textQyt = document.getElementById("_InvoiceQuantity" + textID).value;
                                //textQyt = document.getElementById("_InvoiceQuantity" + i).value;
                            } else if (index == 3) {
                                /// textPrice = $("_InvoicePrice" + i).val()
                                textPrice = document.getElementById("_InvoicePriceAfterDiscount" + textID).value;
                                //  textPrice = document.getElementById("_InvoicePrice" + i).value;
                            } else if (index == 4) {
                                //textTotalPrice = $("_InvoiceTotal" + i).val()
                                textTotalPrice = document.getElementById("_InvoiceTotal" + textID).value;
                                // textTotalPrice = document.getElementById("_InvoiceTotal" + i).value;
                            }

                            //console.log("Value in col " + (index + 1) + " : " + colVal.trim());
                        });
                        // alert(textID + " " + textItemName + " " + textQyt + " " + textPrice + " " + textTotalPrice);
                        //ajax hear

                        var settings = {
                            "url": "http://127.0.0.1:3000/api/dashboard/addItemToInvoice",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            "data": {
                                "invoice_id": response.invoice_id,
                                "item_id": textID,
                                "quantity": textQyt,
                                "price": textPrice,
                                "total_price": textTotalPrice,
                            },


                            error: function(xhr, textStatus, error) {

                                hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');


                            }

                        };

                        $.ajax(settings, ).done(function(response) {
                            var hulla = new hullabaloo();
                            hulla.send("تم إنشاء الفاتورة بنجاح ", 'success');
                            $('#LargeInvoice').modal('toggle');
                            $('#_InvoiceName').val(null);
                            $('#_InvoiceQuantity').val(null);
                            $('#_InvoicePrice').val(null);
                            $('#_InvoiceTotal').val(null);
                            $("#tabledody").remove();
                            $('#mySelect2').val(null).trigger('change');
                            window.location = window.location.pathname;

                            tableDashboard.ajax.reload();

                        });




                    });
                }







            });
        }








    });


    //Remove Invoice
    $("#FormRemoveInvoice").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/api/dashboard/deleteInvoice/" + dataModelInvoice.invoice_id,
            type: 'DELETE',
            data: "no data",

            success: function(res, textStatus, xhr) {


                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send(data.responseJSON.msg, 'success');
                    $('#ActionRemoveInvoice').modal('toggle');

                    tableDashboard.ajax.reload();
                    window.location = window.location.pathname;

                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");

            }

        });

        return false;

    });





    /*---------------------------------Start Items Page---------------------------------*/

    var tableItems = $('#TableItemData').DataTable({

        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Arabic.json"

        },
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/api/dashboard/getAllItems",
            "dataSrc": ""
        },
        "columnDefs": [{

                "targets": -1,
                "data": null,
                "render": function(data, type, row, meta) {

                    var IconActionItem = '<a id="' + row.item_id + '" href="#ActionEditItem" class="btn btn-icon btn-primary mb-1"><i class="far fa-edit ml-5"></i></a> ';
                    IconActionItem += '<a id="' + row.item_id + '" href="#ActionRemoveItem" class="btn btn-icon btn-danger mb-1"><i class="far fa-trash-alt"></i></a>';

                    return IconActionItem;
                }


            }, {

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var theItemID = '<b>' + row.item_id + '</b>';


                    return theItemID;
                }


            }, {
                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {

                    var Item_name = '<b>' + row.item_name + '</b>';

                    return Item_name;
                }
            },
            {
                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {

                    var Item_price = '<b>' + row.price + '</b>';

                    return Item_price;
                }
            },

        ],
        "columns": [
            { "data": "item_id" },
            { "data": "item_name" },
            { "data": "price" },
            { "data": "" }


        ]

    });

    var dataModelItems;
    $('#TableItemData tbody').on('click', '[href="#ActionEditItem"]', function() {
        dataModelItems = tableItems.row($(this).parents('tr')).data();
        $("#EditItem_itemName").val(dataModelItems.item_name);
        $("#editprice").val(dataModelItems.price)
        $("#editselling-price").val(dataModelItems.selling_price)
        $('#ActionEditItem').modal('show');


    });

    $('#TableItemData tbody').on('click', '[href="#ActionRemoveItem"]', function() {
        dataModelItems = tableItems.row($(this).parents('tr')).data();
        //  $("#FormRemoveCategory span").text(dataModelCategory.Cat_Name);
        $('#ActionRemoveItem').modal('show');
    });



    $("#FormAddNewItem").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var txtItemName = $('#AddNewItem_itemName').val();
        var txtItemPrice = $('#price').val();



        var settings = {
            "url": "http://127.0.0.1:3000/api/dashboard/addNewItem",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {

                "item_name": txtItemName,
                "price": txtItemPrice,

            },


            error: function(xhr, textStatus, error) {

                hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                $('#ActionAddCategory').modal('toggle');

            }

        };

        $.ajax(settings, ).done(function(response) {
            var hulla = new hullabaloo();
            hulla.send(response.msg, 'success');
            $('#ActionAddItem').modal('toggle');
            $('#AddNewItem_itemName').val(null);
            $('#price').val(null);

            tableItems.ajax.reload();

        });



        return false;







    });
    //Remove Category
    $("#FormRemoveItem").submit(function(event) {

        /* Stop form from submitting normally */
        event.preventDefault();
        //event.stopPropagation();
        //$(this).off(event);

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/api/dashboard/deleteItem/" + dataModelItems.item_id,
            type: 'DELETE',
            data: "no data",

            success: function(res, textStatus, xhr) {
                console.log("in if:");
                //table.ajax.reload();
            },
            complete: function(data) {


                if (data.status == 200) {
                    hulla.send(data.responseJSON.msg, 'success');
                    $('#ActionRemoveItem').modal('toggle');
                    tableItems.ajax.reload();

                } else {

                    hulla.send('Errors: ' + data.responseJSON.msg, 'danger');

                }
            },

            error: function(xhr, textStatus, error) {
                // hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                console.log("in if:");






            }


        });



        return false;


    });
    //Update Category
    $("#FormEditItem").submit(function(e) {

        /* Stop form from submitting normally */
        e.preventDefault();

        var txtItemName = $("#EditItem_itemName").val();
        var txtItemPrice = $('#editprice').val();


        console.log(dataModelItems.item_id);

        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/api/dashboard/editItem/" + dataModelItems.item_id,
            type: 'PUT',
            data: { "item_name": txtItemName, "price": txtItemPrice, },
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function(data, textStatus, xhr) {
                //console.log("in success:" + res)
                hulla.send(data.msg, 'success');

                $('#ActionEditItem').modal('toggle');

                tableItems.ajax.reload();

            },


            error: function(xhr, textStatus, error) {
                console.log("in error:" + xhr)
                hulla.send('Errors: ' + xhr.responseJSON.msg, 'danger');
                //tableItems.ajax.reload();

            }


        });




        tableCategory.ajax.reload();

        return false;
    });

    /*---------------------------------Start Setting Page---------------------------------*/

    $("#FormSettingInfo").submit(function(e) {

        /* Stop form from submitting normally */
        e.preventDefault();

        var adminName = $("#name").val();
        var adminPhone = $("#phone").val();
        var adminPassword = $("#password").val();
        var adminEmail = $("#email").val();
        var adminID = $("#admin_id").val();


        var hulla = new hullabaloo();

        $.ajax({
            url: urlDashBoard + "/api/user/adminSetting",
            type: 'PUT',
            data: { name: adminName, email: adminEmail, phone: adminPhone, password: adminPassword, admin_Id: adminID, },
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function(data, textStatus, xhr) {
                //console.log("in success:" + res)
                hulla.send(data.msg, 'success');

                $.ajax({
                    url: urlDashBoard + "/api/users/" + adminID,
                    type: 'GET',

                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    success: function(data, textStatus, xhr) {
                        //console.log("in success:" + res)

                        var delayInMilliseconds = 1000; //1 second
                        setTimeout(function() {
                            window.location.href = window.location;
                        }, delayInMilliseconds);


                    },


                    error: function(xhr, textStatus, error) {
                        console.log("in error:" + xhr)
                        hulla.send(xhr.responseJSON.msg, 'danger');


                    }


                });





            },


            error: function(xhr, textStatus, error) {
                console.log("in error:" + xhr)
                hulla.send(xhr.responseJSON.msg, 'danger');


            }


        });





        return false;
    });


    /*---------------------------------Start Invoice data Table---------------------------------*/


    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var last_segment = url_array[url_array.length - 1]; // Get the last part of the array (-1)
    //alert( last_segment ); // Alert last segment
    var tableInvoiceDataItems = $('#InvoiceDataItems').DataTable({

        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Arabic.json"

        },
        "ordering": false,
        "ajax": {
            "type": "GET",
            "url": "" + urlDashBoard + "/api/dashboard/getInvoiceItemsData/" + last_segment,

            "dataSrc": ""
        },
        "columnDefs": [{

                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var item_id = '<b>' + row.item_id + '</b>';
                    return item_id;
                }


            },
            {
                "targets": 1,
                "data": null,
                "render": function(data, type, row, meta) {


                    var item_name = '<b>' + row.item_name + '</b>';


                    return item_name;
                }
            },



            {
                "targets": 2,
                "data": null,
                "render": function(data, type, row, meta) {


                    var price = '<b>' + row.price + '</b>';


                    return price;
                }
            },



            {
                "targets": 3,
                "data": null,
                "render": function(data, type, row, meta) {


                    var quantity = '<b>' + row.quantity + '</b>';


                    return quantity;
                }
            },



            {
                "targets": 4,
                "data": null,
                "render": function(data, type, row, meta) {


                    var total_price = '<b>' + row.total_price + '</b>';


                    return total_price;
                }
            }

        ],
        "columns": [
            { "data": "invoice_id" },
            { "data": "item_name" },
            { "data": "price" },
            { "data": "quantity" },
            { "data": "total_price" }


        ]

    });











});