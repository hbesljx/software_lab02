package com.ljx.pojo;

import lombok.Data;

import java.util.List;

@Data
public class QueryAll {
    private String username;
    private String oid;
    private String level;
    private int status;
    private List<Machine> machines;
    public QueryAll(){}

    public QueryAll(String username, String oid, String level, int status, List<Machine> machines) {
        this.username = username;
        this.oid = oid;
        this.level = level;
        this.status = status;
        this.machines = machines;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public void setMachines(List<Machine> machines) {
        this.machines = machines;
    }

    @Override
    public String toString() {
        return "queryAll{" +
                "username='" + username + '\'' +
                ", oid='" + oid + '\'' +
                ", level='" + level + '\'' +
                ", status=" + status +
                ", machines=" + machines +
                '}';
    }
}
