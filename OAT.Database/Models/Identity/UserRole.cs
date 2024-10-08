﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OAT.Database.Models.Identity
{
    [Table(nameof(UserRole))]
    public class UserRole
    {
        [ForeignKey(nameof(Identity.User.Id))]
        public Guid UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Identity.Role.Id))]
        public long RoleId { get; set; }
        public Role Role { get; set; }
    }
}
