package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;



@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@Entity
@AllArgsConstructor
public class DoorCode extends EntryCode{

}
