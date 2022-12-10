using backend.Models;
using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;

namespace backend.Repositories;

public class UserRepository
{
    //campo que será injetado
    private readonly ContextDB _context;

    //Construtor que vai injetar a dependência
    public UserRepository([FromServices] ContextDB context)
    {
        _context = context;
    }

    public async Task<List<User>> GetUsers()
    {
        List<User> listUser = await _context.User.AsNoTracking().ToListAsync();
        return listUser;
    }

    public async Task<User> GetUser(string userId)
    {
        User user = await _context.User.FindAsync(userId);
        return user;
    }

    public async Task<User> CreateUser(User userModel)
    {
        var ret = await _context.User.AddAsync(userModel);
        await _context.SaveChangesAsync();
        ret.State = EntityState.Detached;
        return ret.Entity;
    }

    public async Task<User> PutUser(User userModel)
    {
        _context.Entry(userModel).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return userModel;
    }

    public async Task<bool> DeleteUser(string userId)
    {
        var user = await _context.User.FindAsync(userId);
        _context.User.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}
