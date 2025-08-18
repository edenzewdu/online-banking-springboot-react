package com.example.server.Repository;


import com.example.server.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // @Query(value = "select * from userdata where userid =:userid", nativeQuery =
    // true)
    // public boolean existsByUUID(UUID userid);

    // @Query(value = "select * from userdata", nativeQuery = true)
    // public List<User> getAllUsers();

    public User findByEmail(String email);

    public User findByResetPasswordToken(String token);

//    public User findByotp(String otp);

    @Query(value = "select * from userdata where userid = '079b8412-6517-484b-bb85-13f782aacc22'", nativeQuery = true)
    public User getUserWithId();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM userdata WHERE email= :email", nativeQuery = true)
    void deleteUser(String email);

}
