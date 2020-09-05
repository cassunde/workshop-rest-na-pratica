package br.com.workshop.pedido.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document
public class Order {

    @Id
    public String id;

    public String client;
    public String product;
    public Integer amount;
    public BigDecimal value;
    public LocalDate dateCreation;
    public Boolean pending;

    public Order(String id, String client, String product, Integer amount, BigDecimal value, LocalDate dateCreation, Boolean pending) {
        this.id = id;
        this.client = client;
        this.product = product;
        this.amount = amount;
        this.value = value;
        this.dateCreation = dateCreation;
        this.pending = pending;
    }

    public Order() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public void setPending(Boolean pending) {
        this.pending = pending;
    }

    public String getId() {
        return id;
    }

    public String getClient() {
        return client;
    }

    public String getProduct() {
        return product;
    }

    public Integer getAmount() {
        return amount;
    }

    public BigDecimal getValue() {
        return value;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public Boolean getPending() {
        return pending;
    }
}
