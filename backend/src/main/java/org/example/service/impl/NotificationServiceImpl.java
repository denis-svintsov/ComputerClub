package org.example.service.impl;

import org.example.service.NotificationService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Override
//    @Scheduled(cron = "0 * * * * ?")
    public void inform() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd:HH");
        String dateTime = formatter.format(LocalDateTime.now());
        System.out.println(dateTime);
    }
}
