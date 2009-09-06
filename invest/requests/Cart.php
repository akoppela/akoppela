<?php

require 'init.php';
$content = '';


if( isset( $_POST['action'] ) ){
  $action = $_POST['action'];  
  $product = array();
  $status = $act = '';
  
  $tt = $_SESSION['uid'];
  $uid = Cart::GetCartUID(); 
  
  switch( $action ){
    case 'update':
    
        if( isset($_POST['product']) && $_POST['product'] )
        {
          $product = $_POST['product'];
          $arr = array( 'uid' => '"' . $uid . '"' );
          foreach( $product['amount'] as $key => $val )
          {
            $arr['product_id'] = $key;
            $arr['amount'] = $val;
            if( $product['deleted'][$key] == 'y' )            
              $arr['deleted'] = '"y"';
            
            $res = $db->update_query( 'cart_tproduct', $arr, 'WHERE product_id="' . $key . '" AND uid="' . $uid . '"');
            
            unset( $arr['deleted'] );unset( $arr['amount'] );unset( $arr['product_id'] );
          }
          unset($arr);unset($product);
          
          $res = $db->select_full('
            SELECT
              t1.amount, t1.product_id,
              t2.name_' . $lang . ' as name, t2.xsimage as image, t2.price
            FROM
              cart_tproduct as t1
            JOIN
              product as t2 ON ( t1.product_id = t2.id AND t2.deleted="n" )
            WHERE
              t1.uid="' . $uid . '" ANd t1.deleted="n"
            ORDER BY             
              t2.name_' . $lang . ' DESC                       
          ');
          if( $res['count'] ){
            $count = $res['count'];
            $res = $res['result'];
            
            for( $i=0; $i<$count; $i++ )
            {
              $arr2 = array(
                'product_id' => $res['product_id'][$i],
                'amount' => $res['amount'][$i],
                'name' => $res['name'][$i],
                'price' => $res['price'][$i],
                'image' => $res['image'][$i]
              );
              $product[] = $arr2;
            }
            $act = 'create';
          }else{
            $act = 'empty';
            $status = 'Корзина пуста';
          }
          
        }else{
            $act = 'fail';
            $status = 'Не было передано ни одного товара.';
          }
        
        
    
      break;
    case 'add':
        if( isset($_POST['product_id']) && $_POST['product_id'] )
        {
          $product_id = intval( $_POST['product_id'] );
          $lang = $_POST['lang'] ? $_POST['lang'] : 'ru';
                    
          $res = $db->select_full('
            SELECT
              t1.id as product_id, t1.name_' . $lang . ' as name, t1.xsimage as image, t1.price,
              t2.amount
            FROM
              product as t1            
            LEFT JOIN
              cart_tproduct as t2 ON ( t2.product_id=t1.id AND t2.uid="' . $uid . '" AND t2.deleted="n" )
            WHERE
              t1.id="' . $product_id . '" AND t1.deleted="n"
          ');
          if( $res['count'] )
          {
            $res  = $res['result'];
            $arr = array(
              'uid' => ('"' . $uid . '"'),
              'product_id' => ('"' . $product_id . '"'),
              'amount' => '"1"'
                            
            );
            if( $res['amount'][0] ){
              $arr['amount'] =  '"' . intval($res['amount'][0]+1) . '"';
              $res = $db->update_query('cart_tproduct', $arr, 'WHERE product_id="' . $product_id . '" AND uid="' . $uid . '"');            
            }else{
              $res = $db->insert('cart_tproduct', $arr);                                    
            }

              $res = $db->select_full('
                SELECT
                  t1.id as product_id, t1.name_' . $lang . ' as name, t1.xsimage as image, t1.price,
                  t2.amount
                FROM
                  product as t1
                LEFT JOIN
                  cart_tproduct as t2 ON ( t2.product_id = t1.id AND t2.uid="' . $uid . '" AND t2.deleted="n" )
                WHERE
                  t1.id = "' . $product_id . '" AND t1.deleted="n"
              ');
              if( $res['count'] )
              {
                $res = $res['result'];
                $product = array(
                  'product_id' => $res['product_id'][0],
                  'amount' => $res['amount'][0],
                  'name' => $res['name'][0],
                  'price' => $res['price'][0],
                  'image' => $res['image'][0]
                );
                $act = 'added';
                $status = 'Товар добавлен в корзину';
                
              
                
              }else{
                $act = 'fail';
                $status = 'Ошибка сохранения запроса. 1 ';                              
              }
                          

                        
          }else{
            $act = 'fail';
            $status = 'Товар не существует.';
          }
             
        }else{
          $act = 'fail';
          $status = 'Ошибка передачи запроса.';
        }
      
      break; 
  }
  
}else{
  $act = 'fail';
  $status = 'Ошибка передачи запроса.';
}

$arr = array(
 'product' => $product,
 'status' => $status,
 'action' => $act
);

echo json_encode( $arr ); 

?>