package org.example.config;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {
    @Bean
    public DataSource dataSource() {
        SQLServerDataSource sqlServerDataSource = new SQLServerDataSource();
        sqlServerDataSource.setURL("jdbc:sqlserver://localhost");
        sqlServerDataSource.setDatabaseName("ComputerClub2");
        sqlServerDataSource.setEncrypt("true");
        sqlServerDataSource.setTrustServerCertificate(true);
        sqlServerDataSource.setPortNumber(1433);
        sqlServerDataSource.setUser("Admin");
        sqlServerDataSource.setPassword("123456");
        return sqlServerDataSource;
    }
}
