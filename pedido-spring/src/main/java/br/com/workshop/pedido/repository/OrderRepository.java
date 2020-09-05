package br.com.workshop.pedido.repository;

import br.com.workshop.pedido.model.entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    Slice<Order> findByClient(String client, Pageable pageable);
    List<Order> findByClientAndProduct(String client, String product);
}
