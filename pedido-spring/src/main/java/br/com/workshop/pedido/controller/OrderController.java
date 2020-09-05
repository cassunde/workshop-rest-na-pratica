package br.com.workshop.pedido.controller;

import br.com.workshop.pedido.model.entity.Order;
import br.com.workshop.pedido.model.vo.ErrorMessageDefault;
import br.com.workshop.pedido.model.vo.OrderOnlyAmountVO;
import br.com.workshop.pedido.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity listAll(){
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable("id") String id){
        return ResponseEntity.ok(orderRepository.findById(id));
    }

    @GetMapping("/client/{client}")
    public ResponseEntity findByClient(@PathVariable("client") String client, @RequestParam("page") int page){
        Pageable pageable = PageRequest.of(page, 3);
        Slice<Order> byClient = orderRepository.findByClient(client, pageable);
        return ResponseEntity.ok(byClient.getContent());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Order order){
        if(orderRepository.findByClientAndProduct(order.getClient(), order.getProduct()).size() > 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorMessageDefault("Cliente já possue esse produto",11));
        }
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Order order){
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updatePartial(@PathVariable("id") String id, @RequestBody OrderOnlyAmountVO orderOnlyAmountVO){
        Optional<Order> orderOptional = orderRepository.findById(id);

        if(orderOptional.isPresent()){
            Order orderFound = orderOptional.get();
            orderFound.setAmount(orderOnlyAmountVO.getAmount());
            orderRepository.save(orderFound);
            return ResponseEntity.ok(orderFound);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDefault("Pedido nao encontrado",22));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") String id){
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}